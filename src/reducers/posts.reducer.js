function postsReducer(state,action){
    switch(action.type){
        case 'GET_POST':
            const saleRealEstate=action.posts.filter((post)=>post.servicetype === 'REAL_ESTATE' && post.approvalstatus==='ACTIVE' && post.category==='SALE');
            const rentRealEstate=action.posts.filter((post)=>post.servicetype === 'REAL_ESTATE' && post.approvalstatus==='ACTIVE' && post.category==='RENT');
            const pendingPosts=action.posts.filter((post)=>post.approvalstatus==='PENDING');
            return {saleRealEstate,rentRealEstate,pendingPosts}
        
        default:
            return state
    }
}

export default postsReducer;