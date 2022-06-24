export const d3Config = new function(){
    this.dataURL = 'https://raw.githubusercontent.com/cognativex/test-data/main/page_views_per_time.json';
    this.margin = {top: 10, right: 120, bottom: 140, left: 120};
    this.width = 600 - this.margin.left - this.margin.right;
    this.height = 430 - this.margin.top - this.margin.bottom;

    //utitlity functions

    //formats the pagereviews y-axis labels
    this.pageReviewsFormat = (d) => {
        const value = (d/1000).toFixed(1);
        return value === 0 ? 0 : value + 'k';
    }
}();

export const HCConfig = new function(){
    this.dataURL = 'https://raw.githubusercontent.com/cognativex/test-data/main/page_views_per_time.json';
    this.width = 600 
    this.height = 430
}();

export const config = new function(){
    this.dataURL = 'https://raw.githubusercontent.com/cognativex/test-data/main/page_views_per_time.json';
}();

export default config;








