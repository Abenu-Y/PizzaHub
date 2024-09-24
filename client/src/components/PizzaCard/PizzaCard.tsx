import PizzaImg from '../../assets/image/Image.png'

type Props = {
  name:string,
  description:string
}



const PizzaCard = ({name, description}: Props) => {
  return (
    <div className="bg-white shadow-lg p-4 w-[387px] rounded-md">
         <div className='flex flex-col items-center'>
             <div className='rounded-full bg-[#EA810033] w-[318px] h-[318px] flex justify-center items-center'>
                <img src={PizzaImg} alt="Pizza Image" />
             </div>

             <div className='text-center'>
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm text-gray-600">{description}</p>
             </div>
         </div>
    </div>
  )
}

export default PizzaCard