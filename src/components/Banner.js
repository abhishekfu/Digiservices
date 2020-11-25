import React from 'react';
import Carousel from 'react-material-ui-carousel'
import BannerItem from './BannerItem'



export default function Banner(props) {
   
    var items = [
        {
            name: "DigiServices",
            description: "One stop for all your online services.",
            link :"/",
            background:"url('https://images.unsplash.com/photo-1573495782952-e42bd3ea5a4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60') no-repeat fixed center"
        },
        {
            name: "Planning to sell?",
            description: "Post your ad at affordable prices.",
            link:"/real_estates/sale",
            background:"url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60') no-repeat fixed center"
        },
        {
            name: "Wanted to rent?",
            description: "Get them at lowest price in the market.",
            link:'/real_estates/rent',
            background:"url('https://images.unsplash.com/photo-1590986201364-ce95ab280ca2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60') no-repeat fixed center"
        }
    ]

    return (
        <Carousel
            autoPlay
            animation="slide"
            navButtonsAlwaysVisible
            interval={4000}
            >
            {
                items.map((item, i) => {
                    if(item.name==='DigiServices'){
                        return <BannerItem key={i} item={item}/>
                    }else{
                        return <BannerItem key={i} item={item} button/>
                    }
                    
                })
            }
        </Carousel>
    )
}

