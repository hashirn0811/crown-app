import './category-item.scss'

export type ICategoryItem = {
  title: string
  imageUrl: string
  id?: number
}


export default function CategoryItem({ imageUrl, title}: ICategoryItem) {
    return (
      <div className='category-container'>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
    </div>
  )
}
