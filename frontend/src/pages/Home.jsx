import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Bienvenue sur RoomMate
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Trouvez la colocation de vos rêves en quelques clics.
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          to="/listings" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Voir les annonces
        </Link>
        <Link 
          to="/create-listing" 
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Publier une annonce
        </Link>
      </div>
    </div>
  );
};

export default Home;