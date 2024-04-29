@extends('layouts.app')

@section('content')
  <main-search
    v-bind:catfiles       = "{{ $catergories }}"
  ></main-search>
@endsection