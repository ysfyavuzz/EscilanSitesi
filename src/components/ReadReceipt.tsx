/**
 * Read Receipt Component
 *
 * Mesaj okundu/iletildi durumu göstergesi.
 * WhatsApp tarzı tek/çift tik gösterimi.
 *
 * @module components/ReadReceipt
 * @category Components - Chat
 *
 * Features:
 * - Tek tik: Gönderildi
 * - Çift tik (gri): İletildi
 * - Çift tik (mavi): Okundu
 * - Saat ikonu: Gönderiliyor
 * - Timestamp tooltip
 * - Responsive tasarım
 * - Dark mode uyumlu
 *
 * @example
 * ```tsx
 * <ReadReceipt
 *   status="read"
 *   timestamp={new Date()}
 * />
 * ```
 */

import { Check, CheckCheck, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export type ReadReceiptStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface ReadReceiptProps {
  /**
   * Mesaj durumu
   */
  status: ReadReceiptStatus;

  /**
   * Mesaj zamanı
   */
  timestamp?: Date;

  /**
   * Ek CSS sınıfları
   */
  className?: string;

  /**
   * Tooltip gösterilsin mi?
   */
  showTooltip?: boolean;

  /**
   * İkon boyutu
   */
  size?: number;
}

/**
 * ReadReceipt Component
 *
 * Mesaj durumu göstergesi.
 */
export function ReadReceipt({
  status,
  timestamp,
  className,
  showTooltip = true,
  size = 16,
}: ReadReceiptProps) {
  // Status configuration
  const statusConfig = {
    sending: {
      icon: Clock,
      color: 'text-muted-foreground',
      label: 'Gönderiliyor...',
      animated: true,
    },
    sent: {
      icon: Check,
      color: 'text-muted-foreground',
      label: 'Gönderildi',
      animated: false,
    },
    delivered: {
      icon: CheckCheck,
      color: 'text-muted-foreground',
      label: 'İletildi',
      animated: false,
    },
    read: {
      icon: CheckCheck,
      color: 'text-blue-500 dark:text-blue-400',
      label: 'Okundu',
      animated: false,
    },
    failed: {
      icon: AlertCircle,
      color: 'text-red-500 dark:text-red-400',
      label: 'Gönderilemedi',
      animated: false,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  // Format timestamp
  const getTimestampText = () => {
    if (!timestamp) return config.label;

    try {
      const formattedTime = format(timestamp, 'HH:mm', { locale: tr });
      const formattedDate = format(timestamp, 'dd MMMM yyyy', { locale: tr });
      
      return `${config.label} - ${formattedDate} ${formattedTime}`;
    } catch (error) {
      return config.label;
    }
  };

  const iconElement = (
    <Icon
      size={size}
      className={cn(
        config.color,
        config.animated && 'animate-spin',
        'transition-colors',
        className
      )}
    />
  );

  if (!showTooltip) {
    return iconElement;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center cursor-help">
            {iconElement}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{getTimestampText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Read Receipt with Text Component
 *
 * İkon ile birlikte durum metni gösterir.
 */
export interface ReadReceiptWithTextProps extends ReadReceiptProps {
  /**
   * Metin gösterilsin mi?
   */
  showText?: boolean;
}

export function ReadReceiptWithText({
  status,
  timestamp,
  className,
  showText = true,
  size = 16,
}: ReadReceiptWithTextProps) {
  const statusConfig = {
    sending: { label: 'Gönderiliyor...', color: 'text-muted-foreground' },
    sent: { label: 'Gönderildi', color: 'text-muted-foreground' },
    delivered: { label: 'İletildi', color: 'text-muted-foreground' },
    read: { label: 'Okundu', color: 'text-blue-500 dark:text-blue-400' },
    failed: { label: 'Gönderilemedi', color: 'text-red-500 dark:text-red-400' },
  };

  const config = statusConfig[status];

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <ReadReceipt
        status={status}
        timestamp={timestamp}
        showTooltip={false}
        size={size}
      />
      {showText && (
        <span className={cn('text-xs font-medium', config.color)}>
          {config.label}
        </span>
      )}
      {timestamp && (
        <span className="text-xs text-muted-foreground">
          {format(timestamp, 'HH:mm', { locale: tr })}
        </span>
      )}
    </div>
  );
}

/**
 * Message Timestamp Component
 *
 * Sadece mesaj zamanı gösterir.
 */
export interface MessageTimestampProps {
  timestamp: Date;
  className?: string;
  format?: string;
}

export function MessageTimestamp({
  timestamp,
  className,
  format: formatString = 'HH:mm',
}: MessageTimestampProps) {
  try {
    return (
      <span className={cn('text-xs text-muted-foreground', className)}>
        {format(timestamp, formatString, { locale: tr })}
      </span>
    );
  } catch (error) {
    return null;
  }
}

/**
 * Message Footer Component
 *
 * Mesaj zamanı ve read receipt'i birlikte gösterir.
 */
export interface MessageFooterProps {
  timestamp: Date;
  status?: ReadReceiptStatus;
  className?: string;
  showStatus?: boolean;
}

export function MessageFooter({
  timestamp,
  status = 'sent',
  className,
  showStatus = true,
}: MessageFooterProps) {
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <MessageTimestamp timestamp={timestamp} />
      {showStatus && (
        <ReadReceipt
          status={status}
          timestamp={timestamp}
          showTooltip={true}
          size={14}
        />
      )}
    </div>
  );
}
