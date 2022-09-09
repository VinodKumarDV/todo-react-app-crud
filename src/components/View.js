import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash, edit} from 'react-icons-kit/feather'

const View = ({ prods, deleteFood, handleEditClick }) => {
    
    return prods.map(prod=>(
        
        <tr key={prod.price}>
            <td className='text-center' >{prod.food}</td>
            <td className='text-center' >{prod.available}</td>
            <td className='text-center' >{prod.price}</td>
            <td className='text-center text-primary' onClick={() => handleEditClick(prod)}>
                <Icon icon={edit} />
            </td>
            <td className='delete-btn text-center' onClick={()=>deleteFood(prod.price)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
    ))
}

export default View