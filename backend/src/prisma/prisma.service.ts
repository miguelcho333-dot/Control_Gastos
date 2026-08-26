import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL,
        });
        super({ adapter });
    }

    // Se ejecuta automáticamente cuando NestJS se enciende
    async onModuleInit() {
        await this.$connect();
        console.log('✅ Conexión exitosa a PostgreSQL en Supabase');
    }

    // Se ejecuta automáticamente si el servidor NestJS se apaga
    async onModuleDestroy() {
        await this.$disconnect();
    }
}

