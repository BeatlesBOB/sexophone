import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-black min-h-screen w-screen overflow-y-auto flex justify-center items-center px-5 py-16">
      <div className="shadow-2xl flex flex-col gap-4 max-w-3xl shadow-white/20 py-16 px-8 border border-neutral-700 text-center">
        <h1 className="flex gap-0.5 justify-center items-center text-white text-3xl font-bold">
          <span className="bg-amber-500 p-1 text-black">Sex</span>
          ophone
        </h1>
        <h2 className="text-white text-4xl font-bold">Avez-Vous 18 Ans ?</h2>
        <p className="text-white text-xl">
          Ce site Web contient du matériel avec des restrictions d'âge, y
          compris de la nudité et des représentations explicites de l'activité
          sexuelle. En vous inscrivant, vous affirmez que vous avez au moins 18
          ans ou l'âge de la majorité dans la juridiction à partir de laquelle
          vous accédez au site Web et que vous consentez à visionner du contenu
          sexuellement explicite.
        </p>
        <div className="flex flex-wrap gap-2.5 mt-8 justify-center">
          <Link
            to="/sex"
            className="bg-amber-500 text-black text-xl p-4 font-bold rounded"
          >
            J'ai 18 ans ou plus - Entrer
          </Link>
          <a
            href="https://www.google.com/"
            className="bg-neutral-800 text-white text-xl p-4 font-bold rounded hover:bg-neutral-700"
          >
            J'ai moins de 18 ans ou plus - Quitter
          </a>
        </div>
      </div>
    </div>
  );
}
