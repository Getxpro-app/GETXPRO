import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './public/getxgo.svg';
import { checked } from '../App.css';
import { QUERY_ME } from '../utils/queries';
import Checkbox from '../components/Checkbox/index';
import { EDIT_CHECKLIST } from '../utils/mutations';
import { capitalizeFirstLetter } from '../utils/helpers';

const checklistItems = [
    {
        name:'Passport',
        attributes:'passport',
    },
    {
        name:'Home Insurance',
        attributes:'homeInsurance'
    },
    {
        name:'Auto Insurance',
        attributes: 'autoInsurance'
    },
    {
        name:'Medical Card',
        attributes: 'medicalCard'
    },
    {
        name: 'Social Security Card',
        attributes: 'socialSecurityCard'
    }
]
const personalItems = [
    {
        name: 'Cash',
        attributes: 'cash'
    },
    {
        name: 'Jacket',
        attributes: 'jacket'
    }
]

function Checklist(props) {
	const [formState, setFormState] = useState();
	const [isChecked, setIsChecked] = useState(false);
	const { loading, data } = useQuery(QUERY_ME);
	const [editChecklist] = useMutation(EDIT_CHECKLIST);

	useEffect(() => {
		if (loading) {
			return <div>Loading User...</div>;
		}

		// back end call to db		
		function getUserChecklist() {
			for (const [key, value] of Object.entries(data.me.myChecklist[0])) {
				if (typeof value === 'string') {
					delete data.me.myChecklist[0][key];
				}
			}
	
			// console.log(data.me.myChecklist[0]);
			// returns object from db
			return data.me.myChecklist[0];
		}

		let formStateDB = getUserChecklist();
		setFormState(formStateDB);
	})
	
	if(formState) {
		document.getElementById('passport').checked = formState.passport;
		document.getElementById('homeInsurance').checked = formState.homeInsurance;
		document.getElementById('autoInsurance').checked = formState.autoInsurance;
		document.getElementById('medicalCard').checked = formState.medicalCard;
		document.getElementById('socialSecurityCard').checked = formState.socialSecurityCard;
		document.getElementById('cash').checked = formState.cash;
		document.getElementById('jacket').checked = formState.jacket;

	}
	
	function saveCheckbox() {
		console.log('save button clicked');

		editChecklist({variables: {
			autoInsurance: document.getElementById('autoInsurance').checked, 
			passport: document.getElementById('passport').checked,
			homeInsurance: document.getElementById('homeInsurance').checked,
			medicalCard: document.getElementById('medicalCard').checked,
			socialSecurityCard: document.getElementById('socialSecurityCard').checked,
			cash: document.getElementById('cash').checked,
			jacket: document.getElementById('jacket').checked
		}})
	}
	if (loading) {
        return <div>Loading User...</div>;
    }

	return (
		<div className='container my-1'>
			<div className='checklist-logo'>
				<object className='logo' data={Logo}></object>
			</div>
			<div className='checklist-header'>
				<h1 className='hello-user'>Hello, {capitalizeFirstLetter(data.me.username)}</h1>
				<p>Your checklist</p>
			</div>
			<form className='checklist-form'>
				<h4 className='checklist-section-header'>
					Documents
				</h4>
				<p className='checklist-instructions'>
					Make a copy of the list below and put
					inside of your GETXGO Kit
				</p>
				{checklistItems.map((checklistItem, index) => (
					<div key={index}>
						<label htmlFor={checklistItem.attributes} className='checkbox-label'>
							<input type="checkbox" id={checklistItem.attributes} name={checklistItem.attributes} className='checkbox'></input>
							<span>{checklistItem.name}</span>
						</label>
					</div>
				))}
				<br></br>
				<h4 className='checklist-section-header'>Personal Items</h4>
				{personalItems.map((personalItem, index)=> (
					<div key={index}>
						<label htmlFor={personalItem.attributes} className='checkbox-label'>
							<input type="checkbox" name={personalItem.attributes} id={personalItem.attributes} className='checkbox'/>
							<span>{personalItem.name}</span>
						</label>
					</div>
				))}
				<br></br>
				<button id="saveBtn" type="button" onClick={saveCheckbox}><FontAwesomeIcon icon={faClipboardCheck}/> Save</button>
			</form>
		</div>
	);
}
export default Checklist;