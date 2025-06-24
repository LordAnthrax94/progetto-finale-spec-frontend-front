import Comparatore from "../Components/Comparatore";

export default function Compare(){
  return (
    <div>      
      <h1 className="text-center text-yellow-500 text-xl font-medium m-4">Aggiungi alla lista per comparare dei prodotti e scegliere quello che più ti piace</h1>
      <Comparatore />
    </div>
  );
}