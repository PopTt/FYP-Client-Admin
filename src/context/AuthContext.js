// localStorage.setItem("user", id);
import React, {createContext, useState, useEffect, useReducer} from 'react'
import { instance } from '../axios/Instance'
import { authStore, loginReducer } from './reducer/Auth'
import { eventStore, eventReducer } from './reducer/Event'
import { orgStore, orgReducer } from './reducer/Organization'
import Loading from '../components/Loading'

export const AuthContext =createContext()

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [authState, authDispatch] = useReducer(loginReducer, authStore)
    const [eventState, eventDispatch] = useReducer(eventReducer, eventStore)
    const [orgState, orgDispatch] = useReducer(orgReducer, orgStore)


    const register = async({values}) => {
        setIsLoading(true)
        values.type = "admin"
        const response = await instance.post('auth/register', 
        values
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            window.alert(response.data.message)
        }
        setIsLoading(false)
    }

    const login = async({values}) =>{
        setIsLoading(true)
        // window.alert(values.id)
        // authDispatch({
        //             type: 'LOGIN',
        //             id: values.id,
        //             username: values.name,
        //             email: values.email
        //         })
        values.type = 'admin'
        const response = await instance.post('auth/login', 
        values
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            localStorage.setItem("user", response.data.data._id);
            localStorage.setItem("name", response.data.data.username);
            localStorage.setItem("email", response.data.data.email);


            authDispatch({
                type: 'LOGIN',
                id: response.data.data._id,
                username: response.data.data.username,
                email: response.data.data.email
            })
            //console.log(response.data.data._id)
            await getOrgs()
            window.alert(response.data.message)
            window.location.reload();
        }
        
        setIsLoading(false)
    }

    const logout = async() => {
        setIsLoading(true)
        authDispatch({type: 'LOGOUT'})
        eventDispatch({type: 'LOGOUT'})
        orgDispatch({type: 'LOGOUT'})
        localStorage.removeItem('user');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        window.location.reload();
        setIsLoading(false)

        window.alert("Successfully Logout")
    }

    const getOrgs = async() => {
        try {
            setIsLoading(true)
            let id = await localStorage.getItem("user")

            const response = await instance.get('data/getOrganization/'+ id, 
            ).catch(err => {
                if(err && err.response) {
                    //Alert.alert(err.response.data.message)
                    //Alert.alert("")
                }
            })

            if(response && response.data) {
                orgDispatch({
                    type: 'RETRIEVE_ORGANIZATIONS',
                    orgs: response.data.data
                })
            }
            setIsLoading(false)
        } catch (e) {
            console.log(`getEvents in error ${e}`)
        }
    }

    const getEvents = async(id) => {
        try {

            const response = await instance.get('data/getEventByOrganizationID/'+ id, 
            ).catch(err => {
                if(err && err.response) {
                    //Alert.alert(err.response.data.message)
                    //Alert.alert("")
                }
            })

            if(response && response.data) {
                eventDispatch({
                    type: 'RETRIEVE_EVENTS',
                    events: response.data.data
                })
            }
        } catch (e) {
            console.log(`getEvents in error ${e}`)
        }
    }

    const createOrg = async(values) => {
        setIsLoading(true)
        const response = await instance.post('admin/createOrganization', 
        values
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            window.alert(response.data.message)
            await getOrgs()
        }
        setIsLoading(false)
    }

    const createEvent = async(values) => {
        setIsLoading(true)
        const response = await instance.post('admin/createEvent', 
        values
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            window.alert(response.data.message)
        }
        setIsLoading(false)
    }

    const createManager = async(values) => {
        setIsLoading(true)
        const response = await instance.post('admin/createManager', 
        values
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            window.alert(response.data.message)
            window.location.reload();
        }
        setIsLoading(false)
    }

    const assignManager = async(values) => {
        setIsLoading(true)
        const response = await instance.post('admin/assignManager', 
        values
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            window.alert(response.data.message)
        }
        setIsLoading(false)
    }

    const openEvent = async(event_id) => {
        setIsLoading(true)

        const response = await instance.post('admin/openEvent',
        {
            'event_id': event_id
        }, 
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            await getEvents()
            window.alert('Open Event Successfully')
        }
        setIsLoading(false)
    }

    const openFace = async(event_id) => {
        setIsLoading(true)

        const response = await instance.post('admin/openFaceMethod',
        {
            'event_id': event_id
        }, 
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            await getEvents()
            window.alert('Open Face Verification Method Successfully')
        }
        setIsLoading(false)
    }

    const closeFace = async(event_id) => {
        setIsLoading(true)

        const response = await instance.post('admin/closeFaceMethod',
        {
            'event_id': event_id
        }, 
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            await getEvents()
            window.alert('Close Face Verification Method Successfully')
        }
        setIsLoading(false)
    }

    const closeEvent = async(event_id) => {
        setIsLoading(true)

        const response = await instance.post('admin/closeEvent',
        {
            'event_id': event_id
        }, 
        ).catch(err => {
            if(err && err.response) {
                window.alert(err.response.data.message)
            }
        })

        if(response && response.data) {
            await getEvents()
            window.alert('Close Event Successfully')
        }
        setIsLoading(false)
    }
    // const getEventsManager = async() => {
    //     try {
    //         setIsLoading(true)
    //         let id = await AsyncStorage.getItem('id')

    //         const response = await instance.get('data/getEventByManagerID/'+ id, 
    //         ).catch(err => {
    //             if(err && err.response) {
    //                 //Alert.alert(err.response.data.message)
    //                 //Alert.alert("no")
    //             }
    //         })

    //         if(response && response.data) {
    //             eventDispatch({
    //                 type: 'RETRIEVE_EVENTS',
    //                 events: response.data.data
    //             })
    //         }
    //         setIsLoading(false)
    //     } catch (e) {
    //         console.log(`getEvents in error ${e}`)
    //     }
    // }

    // const openEvent = async(event_id) => {
    //     setIsLoading(true)

    //     const response = await instance.post('admin/openEvent',
    //     {
    //         'event_id': event_id
    //     }, 
    //     ).catch(err => {
    //         if(err && err.response) {
    //             Alert.alert(err.response.data.message)
    //         }
    //     })

    //     if(response && response.data) {
    //         getEventsManager()
    //         Alert.alert('Open Event Successfully')
    //     }
    //     setIsLoading(false)
    // }

    // const closeEvent = async(event_id) => {
    //     setIsLoading(true)

    //     const response = await instance.post('admin/closeEvent',
    //     {
    //         'event_id': event_id
    //     }, 
    //     ).catch(err => {
    //         if(err && err.response) {
    //             Alert.alert(err.response.data.message)
    //         }
    //     })

    //     if(response && response.data) {
    //         getEventsManager()
    //         Alert.alert('Close Event Successfully')
    //     }
    //     setIsLoading(false)
    // }

    // const setLocation = async(event_id, latitude, longitude) => {
    //     setIsLoading(true)

    //     const response = await instance.post('manager/setLocation',
    //     {
    //         'event_id': event_id,
    //         'longitude': longitude,
    //         'latitude': latitude
    //     }, 
    //     ).catch(err => {
    //         if(err && err.response) {
    //             Alert.alert(err.response.data.message)
    //         }
    //     })

    //     if(response && response.data) {
    //         getEventsManager()
    //         Alert.alert('Set Location Successfully')
    //     }
    //     setIsLoading(false)
    // }

    // const setIPaddress = async(event_id, ipaddress) => {
    //     setIsLoading(true)

    //     const response = await instance.post('manager/setIPaddress',
    //     {
    //         'event_id': event_id,
    //         'ipaddress': ipaddress
    //     }, 
    //     ).catch(err => {
    //         if(err && err.response) {
    //             Alert.alert(err.response.data.message)
    //         }
    //     })

    //     if(response && response.data) {
    //         getEventsManager()
    //         Alert.alert('Set IP Address Successfully')
    //     }
    //     setIsLoading(false)
    // }

    const isLogin = async() => {
        try {
            setIsLoading(true)
            let user_id = await localStorage.getItem("user")
            let username = await localStorage.getItem("name")
            let email = await localStorage.getItem("email")

            authDispatch({
                type: 'LOGIN',
                id: user_id,
                username: username,
                email: email 
            })
            if (user_id && (window.location.href.replace(window.location.origin, '') === '/login' || window.location.href.replace(window.location.origin, '') === '/registration')) {
                await getOrgs()
                window.location.href = '/dashboard';
            }

            if(user_id){
                await getOrgs()
            }
            // else if(!user_id && (window.location.href.replace(window.location.origin, '') != '/login' && window.location.href.replace(window.location.origin, '') != '/registration')){
            //     window.location.href = '/login';
            // }
            setIsLoading(false)
        }catch(e){
            console.log(`isLogin in error ${e}`)
        }
    }

    useEffect(() => {
        isLogin()
    }, [])

    if(isLoading){
        return (
            <Loading />
        )
    }

    return (
        <AuthContext.Provider value={{ 
            setIsLoading,
            isLoading,
            register, 
            login,
            logout,
            authState, 
            eventState,
            orgState,
            createOrg,
            createEvent,
            createManager,
            assignManager,
            openEvent,
            closeEvent,
            openFace,
            closeFace,
            getEvents
        }}>
            {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider