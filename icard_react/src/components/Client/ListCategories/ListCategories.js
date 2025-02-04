import React from 'react'
import { Image } from "semantic-ui-react"
import { map } from "lodash"
import "./ListCategories.scss"
import { useNavigate, useLocation } from "react-router-dom"

export function ListCategories(props) {
    const { categories } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const goToCategory = (id) => {
        navigate(`${location.pathname}/${id}`)
    }
    return (
        <div className='list-categories-client'>
            {map(categories, (category) => (
                <div key={category.id} className='list-categories-client__category' onClick={() => goToCategory(category.id)}>
                    <Image src={category.image} size='small' />
                    <span>{category.title}</span>
                </div>
            ))}
        </div>
    )
}

export default ListCategories
