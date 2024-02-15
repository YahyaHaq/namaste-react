import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCard, { withPremiumLabel } from "./ResturantCard";
import Shimmer from "./Shimmer";

const getResturantList = (json) => {
    items = json?.data?.rlp?.swimlanes?.data?.items
    console.log(json?.data?.rlp)
    restList = []



    resIds = new Set([])

    for (let index = 0; index < items.length; index++) {
        item = items[index];
        if (item.content_type === "Vendor") {
            vendors = item.vendors
            for (let index = 0; index < vendors.length; index++) {
                let vendor = vendors[index].vendor;
                if  (!resIds.has(vendor?.id)) {
                    resIds.add(vendor?.id)
                    restList.push(vendor)
                }
            
        }
        
    }
}
    console.log("length of list",restList.length)
    return restList
}

const Body = () => {
    const [listOfRestuarants,setlistOfRestuarants] = useState([]);
    const [filteredResturants,setFilteredRestaurant] = useState([]);
    const [searchText,setSearchText] = useState("")

    const RestaurantCardPremium = withPremiumLabel(RestaurantCard)

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async ( ) => {
        data = await fetch('https://pk.fd-api.com/rlp-service/query', {
  method: 'POST',
  headers: {
    'authority': 'pk.fd-api.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'app-version': 'MICROFRONT.23.45.50',
    'authorization': '',
    'content-type': 'application/json;charset=UTF-8',
    'dps-session-id': 'eyJzZXNzaW9uX2lkIjoiYzVjZmQ5MzY5OTQ1Yjg0ZTJmYmY4ODdlZTEzZjRiNjEiLCJwZXJzZXVzX2lkIjoiMTY5ODU1NzUyNTczOC4yMDI5NjY3NTM0ODM4MTgwMDAucXp3anJkbHF5aCIsInRpbWVzdGFtcCI6MTY5OTY2ODQ0MH0=',
    'origin': 'https://www.foodpanda.pk',
    'perseus-client-id': '1698557525738.202966753483818000.qzwjrdlqyh',
    'perseus-session-id': '1699668406448.746645823680799600.hdeuaoa4lt',
    'platform': 'web',
    'referer': 'https://www.foodpanda.pk/',
    'request-id': '237921fe-b1b3-4cc3-b6d5-38f2ba677a30',
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  },
  body: JSON.stringify({
    'query': '\n    query getOrganicListing(\n        $input: RLPInput!\n        $includeCarousels: Boolean!\n        $includeSwimlanes: Boolean!\n        $includeJoker: Boolean!\n        $includeDynamicSearchbarConfig: Boolean!\n    ) {\n        rlp(params: $input) {\n            organic_listing {\n                views {\n                    returned_count\n                    available_count\n                    aggregations {\n                        ...Aggregations\n                    }\n                    items {\n                        ...Vendor\n                    }\n                    events {\n                        ...VendorEvent\n                    }\n                    # ======================= EXCLUDED FIELDS ======================== #\n                    #banner: String!\n                    #missing_vendor_reasons: Map\n                    #partner: OrganicListingPartner\n                    #tags: Map!\n                }\n            }\n\n            carousels @include(if: $includeCarousels) {\n                ...Carousels\n            }\n\n            swimlanes @include(if: $includeSwimlanes) {\n                ...SwimlaneList\n            }\n\n            joker_offers @include(if: $includeJoker) {\n                ...JokerOffer\n            }\n\n            dynamic_searchbar_config\n                @include(if: $includeDynamicSearchbarConfig) {\n                ...DynamicSearchbarConfig\n            }\n\n            errors {\n                organic_listing\n                swimlanes\n                joker_offers\n                dynamic_searchbar_config\n            }\n        }\n    }\n\n    fragment VendorEvent on VendorEvent {\n        id\n        messages\n    }\n\n    fragment Aggregations on OrganicListingAggregation {\n        cuisines {\n            ...AggregateCharacteristicFields\n        }\n        food_characteristics {\n            ...AggregateCharacteristicFields\n        }\n        quick_filters {\n            ...AggregateCharacteristicFields\n        }\n        discount_labels {\n            title\n            count\n        }\n        delivery_providers {\n            id\n            count\n        }\n        partners {\n            id\n            title\n            count\n            image_url\n            logo_url\n        }\n        payment_types {\n            id\n            title\n            count\n            highlighted\n        }\n        close_reasons #(Diff structure) need to test!\n\n        # ======================= EXCLUDED FIELDS ======================== #\n        #events: [VendorEvent]!   On PARENT LEVEL\n        #banner: String!\n        #discounts: [OrganicListingDiscount]!\n        #food_characteristics_types: Map!\n    }\n\n    fragment AggregateCharacteristicFields on OrganicListingAggregate {\n        id\n        title\n        count\n    }\n\n    fragment VendorMetadata on VendorMetadata {\n        available_in\n        timezone\n        close_reasons\n        is_delivery_available\n        is_pickup_available\n        is_flood_feature_closed\n        is_temporary_closed\n        has_discount\n        events {\n            ...VendorEvent\n        }\n        # ======================= EXCLUDED FIELDS ======================== #\n        # name\n        # tags\n        # actions\n    }\n\n    fragment Vendor on Vendor {\n        id\n        code\n        budget\n        characteristics {\n            cuisines {\n                id\n                name\n                url_key\n            }\n            food_characteristics {\n                id\n                name\n            }\n            primary_cuisine {\n                id\n                name\n                url_key\n            }\n        }\n        accepts_instructions\n        customer_type\n        is_active\n        is_preorder_enabled\n        is_best_in_city\n        tag\n        name\n        rating\n        review_number\n        address_line2\n        latitude\n        longitude\n        minimum_order_amount\n        minimum_delivery_fee\n        minimum_delivery_time\n        original_delivery_fee\n        delivery_fee_delta\n        free_delivery_label\n        minimum_pickup_time\n        is_vat_visible\n        is_vat_included_in_product_price\n        hero_listing_image\n        distance\n        has_delivery_provider\n        loyalty_program_enabled\n        loyalty_percentage_amount\n        vertical\n        is_premium\n        ncr_pricing_model\n        ncr_token\n        preorder_time_offset\n        partner_ids\n        metadata {\n            ...VendorMetadata\n        }\n        tags {\n            code\n            text\n            origin\n            label_metadata {\n                panda_pro {\n                    is_pro\n                    type\n                    is_applicable\n                }\n            }\n        }\n        tile {\n            type\n            primary_tags {\n                ...ElementGroup\n            }\n            secondary_tags {\n                ...ElementGroup\n            }\n            vendor_info {\n                ...ElementGroup\n            }\n        }\n        chain {\n            code\n            name\n        }\n        discounts_info {\n            id\n            value\n        }\n        location_event {\n            id\n            message\n            tags\n            type\n            value\n            name\n        }\n        favorite_data {\n            favorited_on\n        }\n        url_key\n        minimum_basket_value_discount {\n            delivery_discount\n            is_free_delivery\n            threshold\n            is_pro\n            total_delivery_fee\n        }\n\n        # ======================= EXCLUDED FIELDS ======================== #\n        # schedules          Vendor info from rdp\n        # specialDays        Vendor info from rdp\n        # web_path           Share on rdp\n        # customer_phone     Vendor contact on verticals\n        # budget             Search domain model\n        # primary_cuisine_id Search domain model & Redundant\n        # characteristics    Redundant information\n        # vertical_segment   Catering\n        # vertical_type_ids  Megamarts\n        # tag\n        # redirection_url\n        # maximum_express_order_amount\n        # is_vat_included_in_product_price\n        # allergens_link\n        # is_best_in_city\n        # accepts_instructions\n    }\n\n    # ======================= Not Exist FIELDS in the Schema ======================== #\n    #menus                               RDP\n    #toppings                            RDP\n    #products                            Search\n    #search_metadata                     Search\n    #review_with_comment_number          DINE_IN\n    #is_vat_included & other vat fields  Cart\n    #trade_register_number               Checkout - payment\n    #time_picker                         Megamart\n    #imprint                             Shops\n    #topic_ratings                       Vendor Scoring/reviews Verticals\n\n    \n    \n    fragment CarouselItem on Campaign {\n        campaign_id\n        active\n        ranking\n        title\n        subtitle\n        info\n        expedition_types\n        vertical_types\n        image_small\n        image_medium\n        image_large\n        image_small_desktop\n        image_large_desktop\n        url_key\n        terms\n        scopes\n\n        filters {\n            budgets\n            has_free_delivery\n            has_online_payment\n            has_discount\n            is_voucher_enabled\n            tag_id\n            tags\n            cuisine {\n                id\n                title\n            }\n            food_characteristic {\n                title\n                id\n            }\n        }\n        links {\n            web_link\n        }\n        voucher {\n            voucher_code\n            is_voucher_saved\n        }\n    }\n\n\n    fragment Carousels on Carousels {\n        data {\n            id\n            campaigns {\n                ...CarouselItem\n            }\n        }\n    }\n\n    \n    \n    fragment Swimlane on Swimlane {\n        id\n        content_type\n        custom_strategy\n        filters {\n            id\n            title\n            type\n            count\n        }\n        headline\n        layout\n        traces\n        custom_meta {\n            custom_layout\n        }\n        vendors {\n            vendor {\n                ...Vendor\n            }\n        }\n    }\n\n    fragment SwimlaneList on Swimlanes {\n        data {\n            items {\n                ...Swimlane\n            }\n        }\n        meta {\n            config_name\n            took\n            traces\n        }\n        request_id\n        status\n    }\n\n    \n    \n    fragment JokerVendor on Vendor {\n        id\n        city {\n            name\n        }\n        code\n        name\n        delivery_fee_type\n        distance\n        minimum_delivery_time\n        minimum_pickup_time\n        rating\n        review_number\n        hero_listing_image\n        budget\n        minimum_delivery_fee\n        minimum_order_amount\n        primary_cuisine_id\n        cuisines {\n            id\n            name\n            url_key\n        }\n        url_key\n        is_active\n        food_characteristics {\n            id\n            name\n        }\n    }\n\n    fragment JokerOffer on JokerOffers {\n        offer_id\n        currency\n        status\n        status_text\n        items {\n            reservation_code\n            is_last_promotion\n            rank\n            status\n            status_text\n            vendor {\n                code\n                details {\n                    ...JokerVendor\n                }\n            }\n        }\n        remaining_duration\n        creation_date\n        expiration_date\n        tiers {\n            discount {\n                value\n                maximum_amount\n            }\n            tier_id\n            mov\n        }\n        current_tier_id\n        next_tier_id\n        amount_to_reach_next_tier\n        joker_fee\n        joker_voucher_code\n        joker_commission_base\n        tiers_type\n    }\n\n    \n    \n    fragment DynamicSearchbarConfigData on DynamicSearchBarConfigData {\n        type\n        message\n    }\n\n\n    fragment DynamicSearchbarConfig on DynamicSearchBarConfig {\n        data {\n            ...DynamicSearchbarConfigData\n        }\n    }\n\n    \n    fragment ElementGroup on ElementGroup {\n        id\n        elements {\n            __typename\n            ... on Icon {\n                icon_id\n                icon_decorators\n            }\n            ... on Image {\n                url\n            }\n            ... on Separator {\n                separator_id\n            }\n            ... on Text {\n                text_id\n                text\n                args\n                text_decorators\n            }\n        }\n    }\n\n',
    'variables': {
      'input': {
        'latitude': 31.484259889864592,
        'longitude': 74.39730945165019,
        'locale': 'en_PK',
        'language_id': '1',
        'customer_id': '',
        'customer_type': 'REGULAR',
        'expedition_type': 'DELIVERY',
        'joker_offers': {
          'single_discount': true
        },
        'feature_flags': [
          {
            'name': 'dynamic-pricing-indicator',
            'value': 'Variant'
          }
        ],
        'organic_listing': {
          'views': [
            {
              'budgets': '',
              'configuration': 'Original',
              'cuisines': '',
              'discounts': '',
              'food_characteristics': '',
              'quick_filters': '',
              'use_free_delivery_label': true,
              'ncr_place': 'list',
              'ncr_screen': 'shop_list',
              'payment_types': '',
              'delivery_providers': '',
              'discount_labels': '',
              'tag_label_metadata': true,
              'limit': 48,
              'offset': 0
            }
          ]
        },
        'swimlanes': {
          'config': 'Original'
        }
      },
      'includeCarousels': true,
      'includeSwimlanes': true,
      'includeJoker': false,
      'includeDynamicSearchbarConfig': false
    }
  })
});
        console.log(data)     
        res_json = await data.json()

        console.log("HEREEE")
        console.log(res_json)

        const restList = getResturantList(res_json)

        console.log(restList)
        
        setlistOfRestuarants(restList);
        setFilteredRestaurant(restList);
    }

    const onlineStatus = useOnlineStatus();
    
    if (onlineStatus == false) return <h1>Looks like you are offline. please check your internet connection</h1>

    if (listOfRestuarants.length === 0) {
        return  <Shimmer />
    }



    return (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" className="border-solid bg-slate-100 p-2" value={searchText} onChange={(e)=>{
                        setSearchText(e.target.value)
                    }}/>
                    <button className="search-btn mx-4 px-4 py-2 bg-green-100 rounded-md" onClick={
                        () => {
                            filteredRes = restList.filter((res)=> res.name.includes(searchText));

                            if (filteredRes.length !== 0) {
                                setFilteredRestaurant(filteredRes)
                            }
                        }
                    }>Search</button>
                  </div>
                <div className="search m-4 p-4 flex items-center">
                <button className="px-4 py-2 bg-green-300"  onClick={()=>{
                    const filteredList = listOfRestuarants.filter(restuarant=> restuarant.rating>=4);
                    setFilteredRestaurant(filteredList);
                }}
                >Top rated restaurant
                </button>
                </div>
            </div>
            <div className="res-container flex flex-wrap m-4 px-1 py-4">
                {filteredResturants.map(restaurant=>
                <Link 
                  key={restaurant.id} to={{     
                  pathname: '/restuarant/'+restaurant.name
                 }}
                 state={{ resData: restaurant}}
                 >
                  {(restaurant.is_premium) ? <RestaurantCardPremium resInfo={restaurant} />
                  :<RestaurantCard resInfo={restaurant} />}
                  </Link>)}
                {console.log("rendering restuarants")}
            </div>
        </div>
    )
}

export default Body;