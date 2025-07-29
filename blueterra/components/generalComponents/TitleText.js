import { playfair} from '@/app/fonts'

export default function TitleText({className=' font-medium', text=''}){
    return(
                    <h1 className={`${playfair.className} ${className} text-dark-4B text-[50px]`} >{text}</h1>
        
    )
}