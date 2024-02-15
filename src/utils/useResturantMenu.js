import { useEffect, useState } from "react"

const useResturantMenu = (data) => {
    const [menuItems, setMenuItems]= useState(null)

    useEffect(()=>{
        fetchMenu(data)
    },[])

    const getMenuItems = (resInfo) => {
        let menuItems = []

        let menus = resInfo?.data?.menus[0]?.menu_categories

        for (let index = 0; index < menus.length; index++) {
            const menu = menus[index];
            items = menu?.products.map((product)=>product)

            menuItems.push(...items)
            
        }

        return menuItems
    }

    const fetchMenu = async (data) => {
        url = "https://pk.fd-api.com/api/v5/vendors/"+data.code+"?include=menus,bundles,multiple_discounts&language_id=1&opening_type=delivery&basket_currency=PKR&latitude="+data.latitude+"&longitude="+data.longitude+"&show_pro_deals=true"

        resp = await fetch(url)

        json = await resp.json()
        console.log("yooo")
        console.log(json)

        items = getMenuItems(json)

        setMenuItems(items)
    }

    return menuItems;
}

export default useResturantMenu;