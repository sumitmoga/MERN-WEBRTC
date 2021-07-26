import React from 'react'
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button'
import styles from '../StepPhoneEmail.module.css';

const Email = () => {
    return (
        <Card title="Enter your email" icon="email-emoji">
            <div>
                <Button text="Next" />
            </div>
        </Card>
    )
}

export default Email
