import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import './styles.css';
import { Activity } from '../models/activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then((response) => {
      setActivities(response.data);
    });
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Activities'/>
      <List>
        {activities.map((activity) => (
            <List.Item key={activity.id}>
              <p>{activity.title}</p>
            </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
