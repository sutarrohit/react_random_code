/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

const giftSet = [
  "cat",
  "bike",
  "iphone",
  "laptop",
  "headphones",
  "smartwatch",
  "chocolate box",
  "teddy bear",
  "gaming console",
  "guitar",
  "skateboard",
  "coffee maker",
  "backpack",
  "pair of sneakers",
  "board game",
  "books",
  "Bluetooth speaker",
  "camera",
  "puzzle set",
  "movie tickets",
];

const RandomGifts = () => {
  const [friendName, setFriendName] = useState<string>("");
  const [friendsGift, setFriendGifts] = useState<
    | null
    | {
        name: string;
        gift: string;
      }[]
  >(null);

  const getRandomGift = () => {
    const randomNumber = Math.floor(Math.random() * giftSet.length);
    return giftSet[randomNumber];
  };

  const handleSubmit = () => {
    const gift = getRandomGift();
    setFriendGifts((prev) => [
      ...(prev || []),
      { name: friendName, gift: gift },
    ]);
    setFriendName("");
  };

  const shuffleGifts = () => {
    if (friendsGift) {
      const shuffledGifts = friendsGift.map((friend) => ({
        name: friend.name,
        gift: getRandomGift(),
      }));

      setFriendGifts(shuffledGifts);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col gap-6">
      {/* Add Friends */}
      <p className="font-bold text-lg">
        Add Friend's name to generate random gift
      </p>
      <div className="flex flex-col gap-4 sm:flex-row w-full justify-center items-center">
        <input
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          placeholder="Enter Friend's name"
          className="w-[90%] sm:w-[400px] p-2 border border-gray-800 rounded-xl"
        />
        <button
          onClick={handleSubmit}
          className="border border-gray-900 px-4 py-2 rounded-xl"
        >
          Add Friend
        </button>
      </div>

      {/* Friends gifts */}
      <div>
        {friendsGift &&
          friendsGift.map((info, index) => (
            <div key={index} className="text-lg font-bold text-slate-800">
              <p className="flex gap-2">
                <span>{info.name}</span>=<span>{info.gift}</span>
              </p>
            </div>
          ))}
      </div>

      {friendsGift !== null && (
        <button
          className="border border-gray-900 px-8 py-2 rounded-xl"
          onClick={shuffleGifts}
        >
          Shuffle Gifts
        </button>
      )}
    </div>
  );
};

export default RandomGifts;
