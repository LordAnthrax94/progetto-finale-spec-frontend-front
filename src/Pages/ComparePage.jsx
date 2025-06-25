import Comparatore from "../Components/Comparatore";

export default function Compare(){
  return (
    <div className="relative bg-[url('/img/versus-comparison-retro.jpg')] bg-cover bg-center min-h-screen flex flex-col">      
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      <div className="relative z-10">
        <h1 className="text-center text-yellow-500 text-xl font-medium m-4">
          Aggiungi alla lista per comparare dei prodotti e scegliere quello che più ti piace
        </h1>
        <Comparatore />
      </div>
    </div>
  );
}