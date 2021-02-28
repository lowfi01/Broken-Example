import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import './styles.css';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then((response) => {
      setActivities(response.data);
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
          />
      </Container>
    </>
  );
}

export default App;
