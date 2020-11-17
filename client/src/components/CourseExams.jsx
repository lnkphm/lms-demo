import React from 'react';
import axios from 'axios';
import { useParams, Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionAction from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CreateExamDialog from './CreateExamDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  examList: {
    marginTop: theme.spacing(1),
  },
  detail: {
    display: 'block',
  },
  action: {
    justifyContent: 'flex-start',
  },
  toolbar: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: 'auto',
  }

}));

function ExamAccordion(props) {
  const classes = useStyles();
  const url = `/exams/${props.examId}`;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.description}</Typography>
      </AccordionDetails>
      <Divider />
      <AccordionAction className={classes.action}>
        <Button variant="outlined" component={RouteLink} to={url}>
          View Exam
        </Button>
      </AccordionAction>
    </Accordion>
  );
}

export default function CourseExams(props) {
  const classes = useStyles();
  const [exams, setExams] = React.useState([]);
  const { courseId } = useParams();
  React.useEffect(() => {
    const fetchData = async () => {
      return await axios
        .get(`/api/exams?course=${courseId}`)
        .then((res) => {
          setExams(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [courseId]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.toolbar}>
        <CreateExamDialog />
      </div>    
      <div className={classes.examList}>
        {exams.map((item, index) => (
          <ExamAccordion
            name={item.title}
            description={item.description}
            examId={item._id}
            key={index}
          />
        ))}
      </div>
    </Container>
  );
}
