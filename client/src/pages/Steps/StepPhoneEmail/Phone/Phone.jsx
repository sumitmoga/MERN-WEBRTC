import React, { useState } from 'react'
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState(null)
    const dispatch = useDispatch();

    async function submit() {
        try {
            const { data } = await sendOtp({ phone: phoneNumber });
            dispatch(setOtp({ phone: data.phone, hash: data.hash }));
            onNext();
        } catch (e) { console.log(e) }
    }
    return (
        <Card title="Enter your phone number" icon="phone">
            <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you're agreeing to Our Terms of Service and Privacy Policy, Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Phone
