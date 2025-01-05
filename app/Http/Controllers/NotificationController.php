<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getAllNofications()
    {
        $user = User::where('id', Auth::user()->id)->with('unreadnotifications:id,notifiable_id,type,data,created_at')->first();

        $notifications = $user->unreadnotifications;

        return $notifications;
    }
    
    public function markAsRead($id)
    {
        $notificationId = request('notification_id');

        $userUnreadNotification = auth()->user()
                                    ->unreadNotifications
                                    ->where('id', $id)
                                    ->first();

        // return $userUnreadNotification->data['order_id'];
        $message = $userUnreadNotification->data['message'];
        $type    = $userUnreadNotification->type;
        $link    = $userUnreadNotification->data['link'];

        if($userUnreadNotification) {
            $userUnreadNotification->markAsRead();
        }
        // if (Auth::user()->admin == 1) {
        //     // code...
        //     $link = '/shipping/admin/'. $userUnreadNotification->notifiable_id;
        // } else {
        //     // code...
        //     $link = '/shipping/'. $userUnreadNotification->notifiable_id;
        // }

        // session()->flash('info', $message);
    
        return redirect($link);
    }

    public function markCycleAsRead($id)
    {
        $notificationId = request('notification_id');

        $userUnreadNotification = auth()->user()
                                    ->ordersPaidNotifications
                                    ->where('id', $id)
                                    ->first();

        // return $userUnreadNotification;
        $message = $userUnreadNotification->data['message'];

        if($userUnreadNotification) {
            $userUnreadNotification->markAsRead();
        }

        $link = '/cycle/'. $userUnreadNotification->data['cycle_id'];

        session()->flash('info', $message);
    
        return redirect($link);
    }

    public function markAllAsRead(User $user)
    {
        $user = User::findOrFail($user->id);

        $user->unreadNotifications->markAsRead();

        session()->flash('success', "All Notifications Marked As Read");  

        return back();
    }
}
