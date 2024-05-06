<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('log_activity_login', function (Blueprint $table) {
            $table->integer('status')->unsigned(false)->change();
        });
    }

    public function down(): void
    {
        //
    }
};
