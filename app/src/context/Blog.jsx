import * as anchor from '@project-serum/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import idl from "src/idl.json";
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';


const PROGRAM_KEY = new PublicKey(idl.metadata.address);

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("Parent must be wrapped inside PostsProvider");
  }

  return context;
};

export const BlogProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [transactionPending, setTransactionPending] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [lastPostId, setLastPostId] = useState()
  const [accountPub, setAccountPub] = useState()

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet()
  

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
      return new anchor.Program(idl, PROGRAM_KEY, provider)
    }
  }, [connection, anchorWallet])

  useEffect(() => {

    const start = async () => {
      if (program && publicKey) {
        try {
          const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)
          const user = await program.account.userAccount.fetch(userPda)
          if (user) {
            setInitialized(true)
            setUser(user)
            setLastPostId(user.lastPostId)
            const postAccounts = await program.account.postAccount.all(publicKey.toString())
            const userAccounts = await program.account.userAccount.all(publicKey.toString())
            setPosts(postAccounts)
            setUsers(userAccounts)
            setAccountPub(userPda)
          }
        } catch (error) {
          console.log(error)
          setInitialized(false)
        }
      }
    }

    start()

  }, [program, publicKey, transactionPending]);



  const initUser = async (name, avatar) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true)
        const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)

        await program.methods
          .initUser(name, avatar)
          .accounts({
            userAccount: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()
        setInitialized(true)
      } catch (error) {
        console.log(error)
      } finally {
        setTransactionPending(false);
        setShowUserModal(false);
      }
    }
  }

  const createPost = async (title, content, postImg) => {
    if (program && publicKey) {
      setTransactionPending(true)
      try {
        const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)
        const [postPda] = findProgramAddressSync([utf8.encode('post'), publicKey.toBuffer(), Uint8Array.from([lastPostId])], program.programId)

        await program.methods
          .createPost(title, content, postImg)
          .accounts({
            userAccount: userPda,
            postAccount: postPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        setShowModal(false)
      } catch (error) {
        console.error(error)
      } finally {
        setTransactionPending(false)
      }
    }
  }

  const sendFriendRequest = async (friendPublicKey) => {
    if (program && publicKey) {
      setTransactionPending(true);
      try {
        const [userPda] = PublicKey.findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()],program.programId);
        await program.methods
          .sendFriendRequest()
          .accounts({
            userAccount: userPda,
            friendAccount: friendPublicKey,
            authority: publicKey,
            friend: friendPublicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
  
      } catch (error) {
        console.error('Error sending friend request:', error);
        alert('Failed to send friend request.');
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const respondToFriendRequest = async (friendPublicKey, accept) => {
    if (program && publicKey) {
      setTransactionPending(true);
      try {
        const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()],program.programId);
        await program.methods
          .respondToFriendRequest(accept)
          .accounts({
            userAccount: userPda,
            friendAccount: friendPublicKey,
            authority: publicKey,
            friend: friendPublicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
  
      } catch (error) {
        console.error('Error responding to friend request:', error);
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const deletePost = async (postPublicKey) => {
    if (program && publicKey) {
      setTransactionPending(true);
      try {
        const [userPda] = findProgramAddressSync(
          [utf8.encode('user'), publicKey.toBuffer()],
          program.programId
        );
  
        await program.methods
          .deletePost()
          .accounts({
            postAccount: postPublicKey,
            userAccount: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
  
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setTransactionPending(false);
      }
    }
  };
  

  return (
    <BlogContext.Provider
      value={{
        user,
        posts,
        initialized,
        initUser,
        createPost,
        showModal,
        setShowModal,
        showUserModal,
        setShowUserModal,
        users,
        sendFriendRequest,
        respondToFriendRequest,
        accountPub,
        deletePost
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};