<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ShippingDelivery extends Notification
{
    use Queueable;

    public function __construct($shipping)
    {
        // $this->message = $message;
        $this->shipping = $shipping;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'message'       => "The shipping order: " . $this->shipping->id .  " has been delivered!",
            'shipping_id'   => $this->shipping->id,
        ];
    }
}
