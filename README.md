# Social-Blockchain

This is a decentralized social networking application built on the Solana blockchain. The application allows users to create and manage posts, send and respond to friend requests, and view profiles.

## Features

- User authentication and initialization using Solana wallets
- Creating, viewing, and deleting posts
- Sending and responding to friend requests
- Viewing user profiles

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Solana Smart Contracts (written in Rust), Anchor framework
- **Wallet Integration:** `@solana/wallet-adapter-react`, `@solana/wallet-adapter-wallets`

## Installation

### Prerequisites

- Node.js and npm installed
- Solana CLI installed
- Rust and Anchor CLI installed

### Clone the Repository

```bash
git clone https://github.com/yourusername/social-blockchain-dashboard.git
cd app
npm install
npm start

Usage
Connecting a Wallet
Click the "Connect" button to connect your Phantom wallet.
If not installed, follow the prompts to install the Phantom wallet extension.
Initializing a User
Once connected, click the "Initialize User" button.
Fill out the user form with your name and avatar URL.
Creating a Post
Click the "Create Post" button.
Fill out the post form with the title, content, and image URL.
Click "Submit" to create the post.
Deleting a Post
Click on a post to view its details.
Click the "Delete" button to remove the post.
Sending a Friend Request
Navigate to the "Friends" page.
Enter the public key of the user you want to send a friend request to.
Click "Send Request".
Responding to a Friend Request
Navigate to the "Friends" page.
View incoming friend requests.
Click "Accept" or "Reject" to respond to the request.


License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any inquiries, please contact rasul.eletai@gmail.com.
