#!/usr/bin/env ts-node

import dotenv from 'dotenv';
dotenv.config();

const key = process.env.API_KEY;
if (!key) {
    throw new Error("API_KEY is not defined in the environment variables");
}

interface TrueNasVM {
    id: number;
    name: string;
    description: string;
    vcpus: number;
    memory: number;
    min_memory: number;
    autostart: boolean;
    time: string;
    bootloader: string;
    cores: number;
    threads: number;
    hyperv_enlightenments: boolean;
    shutdown_timeout: number;
    cpu_mode: string;
    //cpu_model: null,
    //cpuset: null,
    //nodeset: null,
    pin_vcpus: boolean;
    hide_from_msr: boolean;
    suspend_on_snapshot: boolean;
    ensure_display_device: boolean;
    //arch_type: null,
    //machine_type: null,
    uuid: string;
    command_line_args: string;
    bootloader_ovmf: string;
    trusted_platform_module: boolean;
    status: {
        state: string;
        pid: number;
        domain_state: string;
    };
};

fetch(`${process.env.API_URL}/vm`, { headers: { Authorization: `Bearer ${key}` } })

    .then((res) => {
        console.log("Received response")
        return res.json();
    }).then((res) => res as TrueNasVM[])
    .then((vms) => {
        vms.forEach((vm) => {
            if (vm.autostart) {
                console.log(`VM ${vm.name} is set to autostart; current state: ${vm.status.state}`);
                if (vm.status.state === "STOPPED") {
                    // need to start
                    fetch(`${process.env.API_URL}/vm/id/${vm.id}/start`, { method: 'POST', headers: { Authorization: `Bearer ${key}` } })
                        .then((res) => {
                            if (res.status === 200)
                                console.log(`VM ${vm.name} started `);
                        })
                }
            }
            if (!vm.autostart) {
                console.log(`VM ${vm.name}; current state: ${vm.status.state}`);
            }
        })
    })
    .catch((err) => console.error(err));
