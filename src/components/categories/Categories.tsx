import './Categories.scss'
import CategoryItem, { ICategoryItem } from './category-item'

type ICategories = {
    categories: ICategoryItem[]
}

export default function Categories({categories}: ICategories) {
    const Items = categories.map((category) => {
        return (
            <CategoryItem key={category.id} imageUrl={ category.imageUrl} title={category.title} />
        )
    })
    return (
    <div className='categories-container'>
            { Items}
    </div>
  )
}
