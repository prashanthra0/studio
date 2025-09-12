'use client';

import { Alert as AlertType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface AlertsProps {
  alerts: AlertType[];
}

export function Alerts({ alerts }: AlertsProps) {
  const { toast, dismiss } = useToast();

  useEffect(() => {
    const activeAlertIds = new Set(alerts.map(a => a.id));
    
    alerts.forEach(alert => {
      toast({
        id: alert.id,
        title: alert.type.charAt(0).toUpperCase() + alert.type.slice(1),
        description: alert.message,
        variant: alert.type === 'error' ? 'destructive' : 'default',
        duration: Infinity
      });
    });

  }, [alerts, toast, dismiss]);

  return null;
}
