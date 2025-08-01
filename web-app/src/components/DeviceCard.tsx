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
        <CardTitle>
          <span className="mr-3">{device.id}</span>
          <SmokeStatusBadge signal={device.signal} />
        </CardTitle>
        <CardDescription />
        <CardAction>
          <Button
            className="size-8 cursor-pointer"
            onClick={onPressAction}
            size="icon"
            variant="secondary"
          >
            <ChevronRightIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm">
        <table>
          <tbody>
            <tr>
              <td className="pr-1">Long:</td>
              <td className="text-muted-foreground">{device.longitude}</td>
            </tr>
            <tr>
              <td className="pr-1">Lat:</td>
              <td className="text-muted-foreground">{device.latitude}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
