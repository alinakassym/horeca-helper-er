import React from 'react';

// Screens
// jobs screens
import {JobEditScreen} from '../screens/jobs/JobEditScreen';
import {JobsPostScreen} from '../screens/jobs/JobsPostScreen';
import {JobsScreen} from '../screens/jobs/JobsScreen';

// employees screens
import {EmployeesScreen} from '../screens/employees/EmployeesScreen';
import {EmployeeReviewScreen} from '../screens/employees/EmployeeReviewScreen';

// search screens
import {EmployeeScreen} from '../screens/employees/EmployeeScreen';
import {FilterScreen} from '../screens/search/FilterScreen';
import {SearchScreen} from '../screens/search/SearchScreen';

// messages screens
import {MessagesChatScreen} from '../screens/messages/MessagesChatScreen';
import {MessagesScreen} from '../screens/messages/MessagesScreen';

// notifications screens
import {NotificationsScreen} from '../screens/notifications/NotificationsScreen';

// profile screens
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ProfileEditScreen} from '../screens/profile/ProfileEditScreen';

// support screens
import {SupportScreen} from '../screens/support/SupportScreen';
import {FAQScreen} from '../screens/support/FAQScreen';

// settings screens
import {SettingsScreen} from '../screens/settings/SettingsScreen';

// subscription screens
import {SubscriptionScreen} from '../screens/subscription/SubscriptionScreen';

// Icons
import {IconSearch} from '../assets/icons/tabs/IconSearch';
import {IconMessages} from '../assets/icons/tabs/IconMessages';
import {IconProfile} from '../assets/icons/tabs/IconProfile';
import {IconNotifications} from '../assets/icons/tabs/IconNotifications';

// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {PrimaryColors, StatusesColors} from '../styles/colors';

export const Navigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Profile"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: PrimaryColors.element,
          tabBarInactiveTintColor: PrimaryColors.grey2,
          tabBarStyle: {
            // note: don't set height, or set screen-specific heights
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginBottom: 0,
          },
          tabBarBadgeStyle: {
            top: 12,
            left: 0,
          },
        }}>
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => {
              return <IconSearch color={color} size={24} width={3} />;
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            headerShown: false,
            tabBarBadgeStyle: {
              top: 4,
              left: 0,
              backgroundColor: StatusesColors.red,
            },
            tabBarBadge: 10,
            tabBarIcon: ({color}) => {
              return <IconMessages color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => {
              return <IconNotifications color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => {
              return <IconProfile color={color} size={24} width={1.5} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Stack.Navigator initialRouteName="Subscription">
      {/*TABS*/}
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="Tabs"
          component={TabStack}
        />
      </Stack.Group>

      {/*JOBS SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="JobsPost"
          component={JobsPostScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="JobEdit"
          component={JobEditScreen}
        />
      </Stack.Group>

      {/*EMPLOYEES SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="Employees"
          component={EmployeesScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Employee"
          component={EmployeeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EmployeeReview"
          component={EmployeeReviewScreen}
        />
      </Stack.Group>

      {/*SEARCH SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="Filter"
          component={FilterScreen}
        />
      </Stack.Group>

      {/*MESSAGES SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          name={'MessagesChat'}
          component={MessagesChatScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>

      {/*PROFILE SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="ProfileEdit"
          component={ProfileEditScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Jobs"
          component={JobsScreen}
        />
      </Stack.Group>

      {/*SUPPORT SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          name={'Support'}
          component={SupportScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'FAQ'}
          component={FAQScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>

      {/*SETTINGS SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          name={'Settings'}
          component={SettingsScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>

      {/*SUBSCRIPTION SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          name={'Subscription'}
          component={SubscriptionScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
