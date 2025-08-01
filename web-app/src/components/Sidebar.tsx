import DevicesList from './DevicesList';

export default function Sidebar() {
  return (
    <div className="grid h-full w-92 grid-rows-[auto_1fr]">
      <h1 className="grid place-items-center py-4 font-semibold text-2xl tracking-tight">
        🔥 Team DiTA 🔥
      </h1>

      <div className="flex flex-1 flex-col gap-3 overflow-auto pt-6 pr-3">
        <span className="font-semibold text-lg text-secondary-foreground">
          Devices
        </span>

        <DevicesList devices={mockData} />
      </div>
    </div>
  );
}

const mockData = [
  {
    signal: {
      longitude: -122.4194,
      latitude: 37.7749,
      id: 'sig_001',
      smokeValue: 500,
      deviceId: 'FW-DEV-001',
      createdAt: new Date('2025-07-31T13:15:30Z'),
      updatedAt: new Date('2025-07-31T13:28:45Z'),
    },
    longitude: -122.4194,
    latitude: 37.7749,
    id: 'location_001',
  },
  {
    signal: {
      longitude: -122.4089,
      latitude: 37.7849,
      id: 'sig_002',
      smokeValue: 520,
      deviceId: 'FW-DEV-002',
      createdAt: new Date('2025-07-31T12:45:20Z'),
      updatedAt: new Date('2025-07-31T13:25:10Z'),
    },
    longitude: -122.4089,
    latitude: 37.7849,
    id: 'location_002',
  },
  {
    signal: {
      longitude: -122.3951,
      latitude: 37.7649,
      id: 'sig_003',
      smokeValue: 350,
      deviceId: null,
      createdAt: new Date('2025-07-31T11:30:15Z'),
      updatedAt: new Date('2025-07-31T13:20:30Z'),
    },
    longitude: -122.3951,
    latitude: 37.7649,
    id: 'location_003',
  },
  {
    signal: {
      longitude: -122.3951,
      latitude: 37.7649,
      id: 'sig_003',
      smokeValue: 78.3,
      deviceId: null,
      createdAt: new Date('2025-07-31T11:30:15Z'),
      updatedAt: new Date('2025-07-31T13:20:30Z'),
    },
    longitude: -122.4294,
    latitude: 37.7549,
    id: 'location_004',
  },
  {
    signal: {
      longitude: -122.4394,
      latitude: 37.7949,
      id: 'sig_005',
      smokeValue: 5.1,
      deviceId: 'FW-DEV-005',
      createdAt: new Date('2025-07-31T10:15:45Z'),
      updatedAt: new Date('2025-07-31T13:15:20Z'),
    },
    longitude: -122.4394,
    latitude: 37.7949,
    id: 'location_005',
  },
  {
    signal: {
      longitude: -122.4594,
      latitude: 37.7449,
      id: 'sig_006',
      smokeValue: 92.7,
      deviceId: 'FW-DEV-006',
      createdAt: new Date('2025-07-31T09:45:30Z'),
      updatedAt: new Date('2025-07-31T13:28:00Z'),
    },
    longitude: -122.4594,
    latitude: 37.7449,
    id: 'location_006',
  },
  {
    signal: undefined,
    longitude: -122.4094,
    latitude: 37.7349,
    id: 'location_007',
  },
  {
    signal: {
      longitude: -122.3894,
      latitude: 37.7649,
      id: 'sig_008',
      smokeValue: 28.4,
      deviceId: 'FW-DEV-008',
      createdAt: new Date('2025-07-31T08:20:10Z'),
      updatedAt: new Date('2025-07-31T13:22:15Z'),
    },
    longitude: -122.3894,
    latitude: 37.7649,
    id: 'location_008',
  },
];
