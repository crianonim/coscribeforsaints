"use client";

import { meds, findMeds, Med } from "./meds";
import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { ChevronsUpDown, Copy, ScrollText, Cross } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [medList, setMedList] = useState<Med[]>([]);
  const [commandValue, setCommandValue] = useState("");
  return (
    <div className="p-4">
      <h1 className="text-xl font-bol flex gap-1">
        <ScrollText />
        <div>Co-Scribe For Saints (Thomas and Guy)</div>
        <Cross />
      </h1>
      <Card className="p-4">
        <CardHeader>Medicines</CardHeader>
        <div className="flex gap-1 my-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {"Select medicine..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search medicines..."
                  value={commandValue}
                  onValueChange={(s) => setCommandValue(s)}
                />
                <CommandEmpty>No medicine found.</CommandEmpty>
                <CommandGroup>
                  {meds
                    .filter((m) => !medList.includes(m))
                    .map((framework) => (
                      <CommandItem
                        key={framework.name}
                        onSelect={(currentValue) => {
                          const med = meds.find(
                            (m) =>
                              m.name.toLocaleLowerCase() ==
                              currentValue.toLocaleLowerCase()
                          );

                          setMedList((ml) =>
                            ml.concat([
                              med || {
                                name: currentValue,
                                description: "",
                                url: "",
                              },
                            ])
                          );
                          setCommandValue("");
                        }}
                      >
                        {framework.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {medList.map((m) => (
            <div
              className="flex border rounded-lg py-1 px-2 items-center cursor-pointer hover:bg-black hover:text-white"
              onClick={() => setMedList((ml) => ml.filter((m2) => m !== m2))}
              key={m.name}
            >
              {m.name}
            </div>
          ))}
        </div>
        <div className="flex gap-1 mt-4">
          <Copy
            onClick={() => {
              navigator.clipboard.writeText(
                "Medicines: " + medList.map((m) => m.name).join(", ")
              );
            }}
            className="opacity-50 hover:opacity-100 cursor-pointer"
          />

          <div>Medicines: {medList.map((m) => m.name).join(", ")}</div>
        </div>
      </Card>
    </div>
  );
}
