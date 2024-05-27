import React, { useEffect, useState, useMemo } from 'react';
import { useBlog } from 'src/context/Blog';
import { Button } from './Button';


export const UserList = () => {
    const {users, sendFriendRequest, user, accountPub} = useBlog()

    const handleFollowClick = async (friendPublicKey) => {
      try {
        await sendFriendRequest(friendPublicKey);
      } catch (error) {
        console.error('Error sending friend request:', error);
      }
    };

    return (
      <div>
        <h1 className='text-center'>All Users</h1>
        <ul>
          {users.map(account => (
            account.publicKey.toString() != accountPub.toString() ? (
              <li key={account.publicKey.toString()}>
                <div className='flex ml-3 mb-5 mt-5 w-100 justify-between'>
                  <div className='flex'>
                    <img
                      src={account.account.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50 mr-5"
                    />
                    <p>{account.account.name}</p>
                  </div>
                  <div className='flex'>
                    {user.friends.map(friend => (
                      friend.toString() != account.publicKey.toString() ?
                    <Button
                      className="ml-3 mr-2"
                      onClick={() => handleFollowClick(account.publicKey)}
                    >
                      Follow
                    </Button> : null
                    ))}
   
                  </div>
                </div>
              </li>
            ) : null
          ))}
        </ul>
      </div>
    );
  };