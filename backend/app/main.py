from datetime import date
from typing import List, Tuple

import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from backend.app.database import get_db_connection, fetch_groups, fetch_teachers, fetch_classroms, fetch_week, \
    fetch_teacher_timetable, fetch_group_timetable, fetch_classroom_timetable, fetch_id_by_teacher_timetable, \
    fetch_id_by_group_timetable, fetch_id_by_classroom_timetable, get_lesson, get_group, put_lesson_update

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def prepare_group(number, degree, year, institute):
    nYear = 0
    if degree == 'bachelor':
        nYear = year - 4
        degree = 'Б'
    elif degree == 'master':
        nYear = year - 2
        degree = 'M'
    elif degree == 'graduate':
        nYear = year - 2
        degree = 'А'
    elif degree == 'speciality':
        nYear = year - 6
        degree = 'С'
    return f"М{institute}О-{number}{degree}-{str(nYear)[-2:]}"

def prepare_lesson_type(lesson_type):
    if lesson_type == 'lecture':
        return "ЛК"
    elif lesson_type == 'seminar':
        return "ПЗ"
    elif lesson_type == 'laboratory':
        return "ЛР"

@app.get("/api/groups", response_model=List[Tuple[str, int]])
def get_groups():
    conn = get_db_connection()
    rows = fetch_groups(conn)
    conn.close()
    groups = []
    for row in rows:
        number, degree, year, institute, id = row
        group = prepare_group(number, degree, year, institute)
        groups.append([group, id])

    return groups


@app.get("/api/classes", response_model=List[Tuple[str, int]])
def get_classes():
    conn = get_db_connection()
    rows = fetch_classroms(conn)
    conn.close()
    classrooms = []
    for row in rows:
        corpus, number, id = row
        classrooms.append([f"{corpus}-{number}", id])
    return classrooms


@app.get("/api/teachers", response_model=List[Tuple[str, int]])
def get_classes():
    conn = get_db_connection()
    rows = fetch_teachers(conn)
    conn.close()
    conn.close()
    teachers = []
    for row in rows:
        name, id = row
        teachers.append([name, id])
    return teachers


@app.get("/api/weeks", response_model=List[str])
def get_weeks():
    conn = get_db_connection()
    rows = fetch_week(conn)
    conn.close()
    return [row[0] for row in rows]


@app.get("/lessons/teacher/{teacher_id}/{start_date}/{end_date}")
async def get_lessons(teacher_id: int, start_date: date, end_date: date):
    conn = get_db_connection()
    rows = fetch_teacher_timetable(conn, teacher_id, start_date, end_date)
    conn.close()
    lessons = [["" for _ in range(7)] for _ in range(6)]
    for row in rows:
        lessons[row[2].weekday()][row[0] - 1] = row[1]
    return lessons

@app.get("/lessons/teacher/id/{teacher_id}/{start_date}/{end_date}")
async def get_lessons(teacher_id: int, start_date: date, end_date: date):
    conn = get_db_connection()
    rows = fetch_id_by_teacher_timetable(conn, teacher_id, start_date, end_date)
    conn.close()
    lessons = [[None for _ in range(7)] for _ in range(6)]
    for row in rows:
        lessons[row[2].weekday()][row[0] - 1] = row[1]
    return lessons



@app.get("/lessons/group/{group_id}/{start_date}/{end_date}")
async def get_lessons(group_id: int, start_date: date, end_date: date):
    conn = get_db_connection()
    rows = fetch_group_timetable(conn, group_id, start_date, end_date)
    conn.close()
    lessons = [["" for _ in range(7)] for _ in range(6)]
    for row in rows:
        lessons[row[2].weekday()][row[0] - 1] = row[1]
    return lessons

@app.get("/lessons/group/id/{group_id}/{start_date}/{end_date}")
async def get_lessons(group_id: int, start_date: date, end_date: date):
    conn = get_db_connection()
    rows = fetch_id_by_group_timetable(conn, group_id, start_date, end_date)
    conn.close()
    lessons = [[None for _ in range(7)] for _ in range(6)]
    for row in rows:
        lessons[row[2].weekday()][row[0] - 1] = row[1]
    return lessons


@app.get("/lessons/classroom/{classroom_id}/{start_date}/{end_date}")
async def get_lessons(classroom_id: int, start_date: date, end_date: date):
    conn = get_db_connection()
    rows = fetch_classroom_timetable(conn, classroom_id, start_date, end_date)
    conn.close()
    lessons = [["" for _ in range(7)] for _ in range(6)]
    for row in rows:
        lessons[row[2].weekday()][row[0] - 1] = row[1]
    return lessons

@app.get("/lessons/classroom/id/{classroom_id}/{start_date}/{end_date}")
async def get_lessons(classroom_id: int, start_date: date, end_date: date):
    conn = get_db_connection()
    rows = fetch_id_by_classroom_timetable(conn, classroom_id, start_date, end_date)
    conn.close()
    lessons = [[None for _ in range(7)] for _ in range(6)]
    for row in rows:
        lessons[row[2].weekday()][row[0] - 1] = row[1]
    return lessons

class Lesson(BaseModel):
    lesson_id: int
    lesson_type: str
    teacher: str
    classroom: str
    group: str
    subject: str

@app.get("/lessons/{lesson_id}")
async def get_lesson_router(lesson_id: int):
    conn = get_db_connection()
    result = get_lesson(conn, lesson_id)
    number, degree, year, institute = get_group(conn, result[0][4])[0]
    group = prepare_group(number, degree, year, institute)
    conn.close()
    if result:
        return Lesson(lesson_id=str(lesson_id), lesson_type=prepare_lesson_type(result[0][0]), teacher=result[0][1], classroom=f'{result[0][2]}-{result[0][3]}',
                      group=group, subject=result[0][5])
    else:
        return {"error": "Lesson not found"}

class UpdateLesson(BaseModel):
    class_id: int
    number: int
@app.put("/update_lesson/{lesson_id}")
async def update_lesson(lesson_id: int, updateLesson: UpdateLesson):
    conn = get_db_connection()
    put_lesson_update(conn, updateLesson.class_id, updateLesson.number, lesson_id)
    conn.close()
    return {"status": "success"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
