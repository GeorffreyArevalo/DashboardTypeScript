
export const getCurrentSeason = ():number => {
    const today = new Date();
    const year = today.getFullYear();
    const moth = today.getMonth();
    if(moth < 9 ) return year - 1;
    return year;

}
