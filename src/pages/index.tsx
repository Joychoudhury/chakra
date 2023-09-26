import Image from 'next/image'
import { Inter } from 'next/font/google'
import CategoryCard from '@/components/CategoryCard'
import Navbar from '@/components/Navbar'

import rudraksh from '../../public/rudraksh.png'
import banalingam from '../../public/banalingam.png'
import yantra from '../../public/yantra.png'
import idol from '../../public/idol.png'
import sphatik from '../../public/sphatik.png'
import shaligram from '../../public/shaligram.png'
import banner from '../../public/banner.png'

const inter = Inter({ subsets: ['latin'] })

const products = [
  {
    imageSrc: idol.src,
    title: ' Deity idol',
    description:
      "Crafted in South India style, beautiful Idols  beautiful looks , rich carving and brilliant shine. Signifying Deity's power of protecting his devotees and defeating the evil in a skillful playful manner, the Idol would enhance the protection energies in your abode.",
    bg: 'bg-blue-100',
    to: 'idol'
  },
  {
    imageSrc: yantra.src,
    title: 'Yantra',
    description:
      "Yantras are believed to have occult powers based on Hindu astrology and tantric texts. They are also believed to be vital for eradicating planet-related negativity and obtaining divine benefits",
    bg: 'bg-red-100',
    to: 'yantra'
  },
  {
    imageSrc: banalingam.src,
    title: 'Shivling',
    description:
      "Banalingams are found naturally in the Narmada River in Madhya Pradesh, India. They are considered auspicious because the marks on the stones are made naturally in the river bed.",
    bg: 'bg-purple-100',
    to: 'shivling'
  },
  {
    imageSrc: rudraksh.src,
    title: 'Rudraksh',
    description:
      "Those who have the blessings of lord Shiva get the opportunity to wear it. The meaning of the word 'Rudraksha' is the eyes of Rudra (Shiva) and his tears (Aksha).",
    bg: 'bg-yellow-100',
    to: 'rudraksh'
  },
  {
    imageSrc: shaligram.src,
    title: 'Shaligram',
    description:
      "Shaligram ji is a fossilized stone brought from Gandaki river in Nepal. This is a beautiful and very rare shaligram of Hayagriva ji.",
    bg: 'bg-green-100',
    to: 'shaligram'
  },
  {
    imageSrc: sphatik.src,
    title: 'Quartz',
    description:
      "The Sphatik mala has excellent reputation for numerous healing and spiritual properties.",
    bg: 'bg-blue-100',
    to: 'quartz'
  },
];

export default function Home() {
  return (
    <div className="">
      <Navbar />

      <div className="p-5">
        <img src={banner.src} className='h-[400px] w-full rounded-2xl shadow-xl' alt="" />
      </div>
      {/* categories */}
      <section className="container mx-auto p-10 md:py-20 px-0 md:p-30 md:px-10">
        <h1 className="p-3 font-bold text-6xl mt-15 mb-10 text-gray-800"> Categories → </h1>
        <section className="grid lg:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5 antialiased">
          {products.map((product, index) => (
            <CategoryCard
              to={product.to}
              key={index}
              index={index}
              bg={product.bg}
              imageSrc={product.imageSrc}
              title={product.title}
              description={product.description}
            />
          ))}
        </section>
      </section>

      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="./" className="hover:underline">Chakra™</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact Us</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
