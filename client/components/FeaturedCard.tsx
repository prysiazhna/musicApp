import React from 'react';
import { Card, CardContent, Typography, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface FeatureCardProps {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow my-4">
            <CardContent className="text-center">
                <Icon fontSize="large" className="mb-2" />
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '8px'}}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;
