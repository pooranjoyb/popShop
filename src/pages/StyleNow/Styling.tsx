import React, { useState } from 'react';
import Head from '../../components/Head';


interface Clothing {
  id: number;
  name: string;
  imageUrl: string;
}

const ClothingStyler: React.FC = () => {
  // Sample clothing items
  const [clothingItems, setClothingItems] = useState<Clothing[]>([
    { id: 1, name: 'T-shirt', imageUrl: 'https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Jeans', imageUrl: 'https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f' },
    {id:3, name: 'Extra',  imageUrl: 'https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}
    // Add more clothing items as needed
  ]);

  const [selectedTop, setSelectedTop] = useState<Clothing | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<Clothing | null>(null);

  return (
    <div className="container mx-auto py-8">
     <Head h1="Choose Your" h2="Outfit" />
      <div className="flex flex-wrap justify-center mb-8">
        <div className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
          <h3 className="text-lg font-bold mb-2">Choice 1</h3>
          <div className="grid grid-cols-2 gap-4">
            {clothingItems.map((item) => (
              <div key={item.id} onClick={() => setSelectedTop(item)} className="cursor-pointer p-2">
                <img src={item.imageUrl} alt={item.name} className="w-full h-auto rounded mb-2" />
                <p className="text-center text-base font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
          <h3 className="text-lg font-bold mb-2">Choice 2</h3>
          <div className="grid grid-cols-2 gap-4">
            {clothingItems.map((item) => (
              <div key={item.id} onClick={() => setSelectedBottom(item)} className="cursor-pointer p-2">
                <img src={item.imageUrl} alt={item.name} className="w-full h-auto rounded mb-2" />
                <p className="text-center  text-base font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Head h1="Your Styled" h2="Outfit" />
      <div className="flex justify-center mt-4">
        {selectedTop && (
          <div className="mr-8">
            <h3 className="font-bold mb-2">Choice 1:</h3>
            <img src={selectedTop.imageUrl} alt={selectedTop.name} className="w-40 h-auto rounded mb-4" />
            <p className="text-center text-base font-medium mt-2">{selectedTop.name}</p>
          </div>
        )}
        {selectedBottom && (
          <div className="ml-8">
            <h3 className="font-bold mb-2">Choice 2:</h3>
            <img src={selectedBottom.imageUrl} alt={selectedBottom.name} className="w-40 h-auto rounded mb-4" />
            <p className="text-center text-base font-medium mt-2">{selectedBottom.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingStyler;