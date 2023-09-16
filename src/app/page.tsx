"use client";

import { meds, findMeds, Med } from "./meds";
import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Check, ChevronsUpDown, Copy } from "lucide-react";

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
  const [value, setValue] = useState("");
  const [commandValue, setCommandValue] = useState("");
  return (
    <div className="p-4">
      <h1 className="text-xl font-bol">
        Co-Scribe For Saints (Thomas and Guy)
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
                {value
                  ? meds.find(
                      (framework) =>
                        framework.name.toLocaleLowerCase() === value
                    )?.name
                  : "Select medicine..."}
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
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
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
