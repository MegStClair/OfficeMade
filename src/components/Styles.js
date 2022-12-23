import { makeStyles } from "@material-ui/core/styles";

// exports call to function makeStyles, which takes in a param & makes callback function for instant return
export default makeStyles(() => ({
// specify name of style, then specify styling, call with camelCase & use strings (( MaterialUI syntax!!!))
    root: {
        maxWidth: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', //16:9
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
