<?php

namespace App\Notifications;

use App\Models\Product;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ProductFavorited extends Notification
{
    public $product;
    public $message;
    public $body;
    public $link;

    public function __construct(Product $product, $message, $body, $link)
    {
        $this->product  = $product;
        $this->message  = $message;
        $this->body     = $body;
        $this->link     = $link;
    }

    public function via($notifiable)
    {
        // return ['mail', 'database', 'broadcast']; // Can be changed based on your needs
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'product_name'  => $this->product->name,
            'message'       => $this->message,
            'body'          => $this->body,
            'link'          => $this->link,
        ];
    }
}
