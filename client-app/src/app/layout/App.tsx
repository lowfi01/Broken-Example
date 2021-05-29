import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './styles.css';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    });
  }, [])

  function handleSelectedActitvity(id: string) {
    setselectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActitvity() {
    setselectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActitvity(id) : handleCancelSelectedActitvity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    if (activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) // update activity
      : setActivities([...activities, {...activity, id: uuid()}]);

    setEditMode(false);
    setselectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }


  if (loading) return <LoadingComponent content="Loading app"/>

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
          activities={activities}
          handleSelectedActitvity={handleSelectedActitvity}
          handleCancelSelectedActitvity={handleCancelSelectedActitvity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          closeForm={handleFormClose}
          openForm={handleFormOpen}
          editOrActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          />
      </Container>
    </>
  );
}

export default App;
