<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ShippingOrder extends Notification
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
            'message'       => $this->shipping->buyer->name . " has submitted a shipping order!",
            'shipping_id'   => $this->shipping->id,
        ];
    }
}
