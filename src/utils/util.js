const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDate = (value) => {
        if (!value) return value;
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${months[month]} ${day}, ${year}`

    }


    // const formatTime = (value) => {
    //     if (!value) return value;
    //     const date = new Date(value);
    //     if (isNaN(date.getDate())) return value;

    //     const now = new Date();
    //     const diffMs = now - date; 
    //     const diffSec = Math.floor(diffMs / 1000);
    //     const diffMin = Math.floor(diffSec / 60);
    //     const diffHr = Math.floor(diffMin / 60);
    //     const diffDay = Math.floor(diffHr / 24);
    //     const diffWeek = Math.floor(diffDay / 7);
    //     const diffMonth = Math.floor(diffDay / 30);
    //     const diffYear = Math.floor(diffDay / 365);

    //     if (diffSec < 60) return "Just now";
    //     if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
    //     if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
    //     if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    //     if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`;
    //     if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
    //     return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;

    // }



export const formatLikesAndComments = (value) => {
         if(value === null || isNaN(value)) return "0";          
          if(value < 1000) return value.toString()
          if(value < 1_000_000) {
               value = value / 1000;
               value = value.toFixed(1);
               value = value.replace(/\.0$/, "");
               return value + "K"
          
          }

          if(value < 1_000_000_000) {
               value = value / 1000000;
               value = value.toFixed(1);
               value = value.replace(/\.0$/, "");
               return value + "m"
          }

          return (value / 1000000000).toFixed(1).replace(/^.0$/, "") + "B"
         
        }
     

