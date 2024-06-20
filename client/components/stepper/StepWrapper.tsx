import React from 'react';
import {Container,styled, Stepper, Step, StepLabel, Grid, Card} from '@mui/material';
import Check from '@mui/icons-material/Check';
import { StepIconProps } from '@mui/material/StepIcon';
import {primaryColor} from "@/utils/theme";

interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode;
}
const steps = ['Add information', 'Upload image', 'Upload audio']
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color:  primaryColor,
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: primaryColor,
        }),
        '& .QontoStepIcon-completedIcon': {
            color: primaryColor,
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" className="h-72 my-16 w-full">
                <Card className="w-1/2">
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;