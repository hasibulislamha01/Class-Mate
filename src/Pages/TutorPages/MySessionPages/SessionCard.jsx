import PropTypes from 'prop-types'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import useAuth from '../../../CustomHooks/useAuth';
import useFormateDate from '../../../CustomHooks/useFormateDate';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const SessionCard = ({ mySession }) => {
    console.log(mySession)
    const { user } = useAuth()

    const tutorPhoto = user?.photoURL
    const tutorName = mySession?.tutorName
    const sessionTitle = mySession?.sessionTitle
    const registrationStartingDate = mySession?.registrationStarts
    const formattedRegistrationStartingDate = useFormateDate(mySession?.registrationStarts)
    const formattedRegistrationEndingDate = useFormateDate(mySession?.registrationEnds)
    const formattedClassStartingDate = useFormateDate(mySession?.classStarts)
    const formattedClassEndingDate = useFormateDate(mySession?.classEnds)
    const applyingDate = useFormateDate(mySession?.applyingDate)
    const duration = mySession?.duration
    const registrationFee = mySession?.registrationFee

    console.log(registrationStartingDate)



    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <img src={tutorPhoto} alt="" />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <BsThreeDotsVertical />
                    </IconButton>
                }
                title={sessionTitle}
                subheader={applyingDate}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}
            <CardContent>
                {/* <Typography variant="body2" color="text.secondary">
                    
                </Typography> */}
                <div className='grid grid-cols-2 justify-items-stretch gap-6'>
                    
                        <div className='text-center'>
                            <p className=''>Registration Starts</p>
                            <h1 className='font-medium'>{formattedRegistrationStartingDate}</h1>
                        </div>
                        <div className='text-center'>
                            <p className=''>Registration Ends</p>
                            <h1 className='font-medium'>{formattedRegistrationEndingDate}</h1>
                        </div>
                   
                        <div className='text-center'>
                            <p className=''>Class Starts</p>
                            <h1 className='font-medium'>{formattedClassStartingDate}</h1>
                        </div>
                        <div className='text-center'>
                            <p className=''>Class Ends</p>
                            <h1 className='font-medium'>{formattedClassEndingDate}</h1>
                        </div>

                        <div className='text-center'>
                            <p className=''>Duration</p>
                            <h1 className='font-medium'>{duration}</h1>
                        </div>
                        <div className='text-center'>
                            <p className=''>Registration Fee</p>
                            <h1 className='font-medium'>{registrationFee}</h1>
                        </div>
                    
                </div>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    some icons
                </IconButton>
                <IconButton aria-label="share">
                    some icons
                </IconButton> */}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <IoIosArrowDown />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        {mySession?.description}
                    </Typography>
                    {/* <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography> */}
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

SessionCard.propTypes = {
    mySession: PropTypes.object
}

export default SessionCard;