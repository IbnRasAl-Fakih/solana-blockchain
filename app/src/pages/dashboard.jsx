import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useEffect, useState } from "react"
import { Button } from "src/components/Button"
import { PostForm } from "src/components/PostForm"
import { useBlog } from "src/context/Blog"
import { useHistory } from 'react-router-dom'
import { UserForm } from "src/components/UserForm"
import { Link } from "react-router-dom"



export const Dashboard = () => {
  const history = useHistory()
  const [connecting, setConnecting] = useState(false)
  const { connected, select } = useWallet()
  const { user, posts, initialized, initUser, createPost, showModal, setShowModal, showUserModal, setShowUserModal, users, deletePost} = useBlog()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [postImg, setPostImg] = useState("")

  

  const onConnect = () => {
    setConnecting(true)
    select(PhantomWalletName)
  }

  useEffect(() => {
    if (user) {
      setConnecting(false)
    }
  }, [user])

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="z-10  w-full h-14  shadow-md">
        <div className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 colorpink"
            >
              Social-Blockchain
            </div>
          </h2>
          {connected ? (
            <div className="flex items-center">
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                <Link to={"/"}>Home</Link>
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-5 underlinepink">
                <Link to={"/friends"}>Friends</Link>
              </p>
              <p className=" font-bold text-sm capitalize underlinepink mr-5">
                <Link to={"/profile"}>Profile</Link>
              </p>
              <img
                src={user ? (user?.avatar) : ("https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg")}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize">
                {user?.name}
              </p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowUserModal(true);
                  }}
                >
                  Initialize User
                </Button>
              )}

            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          <div className="container">
          <div className="row">
            <div className="all__posts">
              {posts.map((item) => {
                console.log(item)
                return (
                  <article className="post__card-2"
                    key={item.account.id}
                  >
                    <div className="post__card_-2 ml-3">
                      <div
                        className="post__card__image-2"
                        style={{
                          backgroundImage: `url(${item.account.img})`,
                        }}
                      ></div>
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat flex">
                            <div className="align-middle mt-2"><span className="dot"> </span>{item.account.title}</div>
                          </div>
                          <p className="post__card_alttitle-2">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
          </div>
        </div>
        <div className={`modal ${showModal && 'show-modal'}`} >
          <div className="modal-content">
            <span className="close-button"
              onClick={() => setShowModal(false)}
            >×</span>
            <PostForm
              postTitle={postTitle}
              postContent={postContent}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              postImg={postImg}
              setPostImg={setPostImg}
              onSubmit={() => createPost(postTitle, postContent, postImg)}
            />
          </div>
        </div>
        <div className={`modal ${showUserModal && 'show-modal'}`} >
          <div className="modal-content">
            <span className="close-button"
              onClick={() => setShowUserModal(false)}
            >×</span>
            <UserForm
              name={name}
              avatar={avatar}
              setName={setName}
              setAvatar={setAvatar}
              onSubmit={() => initUser(name, avatar)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}