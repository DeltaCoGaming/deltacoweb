import React from 'react';
import Link from 'next/link';

const CommunityPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      <ul>
        <li>
          <Link href="/community/mods">
            <a className="text-lg text-blue-500 hover:underline">Mods</a>
          </Link>
        </li>
        {/* Add other community links here */}
      </ul>
    </div>
  );
};

export default CommunityPage;
