import { ChevronRightIcon } from 'lucide-react';
import type { DeviceWithDetails } from '@/lib/devices';
import SmokeStatusBadge from './SmokeStatusBadge';
import { Button } from './ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type Props = {
  device: DeviceWithDetails;
  onPressAction?: () => void;
};

export default function DeviceCard({ device, onPressAction }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{device.id}</CardTitle>
        <CardDescription>
          {device.longitude} {device.latitude}
        </CardDescription>
        <CardAction>
          <Button
            className="size-8"
            onClick={onPressAction}
            size="icon"
            variant="secondary"
          >
            <ChevronRightIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {!!device.signal && <SmokeStatusBadge signal={device.signal} />}
      </CardContent>
    </Card>
  );
}
