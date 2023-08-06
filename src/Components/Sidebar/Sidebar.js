import React from 'react';
import './Sidebar.css'

const myProjects = [{projectId: 'project-1', name: 'My Project'}, {projectId: 'project-2', name: 'My Project 2'}]

const Sidebar = () => {
    return (
        <div className='wrapper'>
            <div className='listWrapper'>
                <div className='list'>My Projects</div>
                {myProjects.map(project => (
                    <div className='subList'>
                        <img className='sidebarIcon'  src={require('../../assets/plus.png')}/>
                        <div>{project.name}</div>
                    </div>
                ))}
                <div className='list'>My Tasks</div>
                <div className='list'>Manage Sprints</div>
                <div className='list'>Manage Members</div>
                <div className='list'>Settings</div>

            </div>
        </div>
    )
}

export default Sidebar;